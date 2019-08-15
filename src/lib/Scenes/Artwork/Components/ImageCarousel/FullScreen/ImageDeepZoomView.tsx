import React, { useEffect, useMemo, useRef, useState } from "react"
import { Animated, Image, View } from "react-native"
import { ImageDescriptor } from "../ImageCarouselContext"
import { useSpringValue } from "../useSpringValue"
import { DJB2 } from "./djb2"
import { screenBoundingBox } from "./screen"
import { EventStream, useEvents } from "./useEventStream"

interface TileProps {
  url: string
  top: number
  left: number
  width: number
  height: number
}

const Tile: React.FC<TileProps> = ({ url, top, left, width, height }) => {
  const [loaded, setLoaded] = useState(false)
  const opacity = useSpringValue(loaded ? 1 : 0)
  return (
    <Animated.View
      style={{
        position: "absolute",
        top,
        left,
        width,
        height,
        opacity,
      }}
    >
      <Image
        onLoad={() => {
          setLoaded(true)
        }}
        source={{
          uri: url,
        }}
        style={{ width, height }}
      />
    </Animated.View>
  )
}

type DeepZoomImageSize = ImageDescriptor["deepZoom"]["Image"]["Size"]

/**
 * The way that deep zoom images are created is by halving the original image
 * dimensions (rounding up to the nearest pixel at each step) recursively
 * until you get to 1px * 1px
 */
export const calculateDeepZoomLevels = ({ Width, Height }: DeepZoomImageSize) => {
  const result: Box[] = [{ width: Width, height: Height }]
  let w = Width
  let h = Height
  while (w !== 1 || h !== 1) {
    w = Math.ceil(w / 2)
    h = Math.ceil(h / 2)
    result.push({ width: w, height: h })
  }
  return result.reverse()
}

/**
 * calculates the max ScrollView.zoomScale for this image
 */
export const calculateMaxZoomViewScale = (imageFittedWithinScreen: Box, fullResolutionImage: DeepZoomImageSize) => {
  return fullResolutionImage.Height / imageFittedWithinScreen.height
}

// zoom levels are in ascending order of size
export const calculateMinMaxDeepZoomLevels = (imageFittedWithinScreen: Box, zoomLevels: Box[]) => {
  let minLevel = 0
  const maxLevel = zoomLevels.length - 1
  for (const { width } of zoomLevels) {
    if (width >= imageFittedWithinScreen.width) {
      break
    }
    minLevel++
  }
  return { minLevel, maxLevel }
}

/**
 *
 */
export const getMaxDeepZoomLevelForZoomViewScale = ({
  zoomScale,
  minLevelWidth,
  minLevel,
}: {
  zoomScale: number
  minLevelWidth: number
  minLevel: number
}) => {
  // minZoomScale is always 1
  // so we basically want to interpolate zoomScale between [minLevel, maxLevel] based on [1, maxZoomScale]
  let levelWidth = minLevelWidth
  let level = minLevel
  while (levelWidth < minLevelWidth * zoomScale) {
    levelWidth *= 2
    level++
  }
  return level
}

export function getVisibleRowsAndColumns({
  imageFittedWithinScreen: { width, height },
  levelDimensions,
  tileSize,
  viewPort,
}: {
  levelDimensions: Box
  imageFittedWithinScreen: Box
  tileSize: number
  viewPort: Rect
}) {
  const scale = levelDimensions.width / width
  tileSize = tileSize / scale
  const numCols = Math.ceil(width / tileSize)
  const numRows = Math.ceil(height / tileSize)
  const minCol = Math.max(0, Math.floor(viewPort.x / tileSize))
  const minRow = Math.max(0, Math.floor(viewPort.y / tileSize))
  const maxCol = Math.min(numCols, Math.floor((viewPort.x + viewPort.width) / tileSize))
  const maxRow = Math.min(numRows, Math.floor((viewPort.y + viewPort.height) / tileSize))
  return { minRow, minCol, maxRow, maxCol, numCols, numRows }
}
export interface ImageDeepZoomViewProps {
  image: ImageDescriptor
  width: number
  height: number
  viewPortChanges: EventStream<Rect>
  $zoomScale: Animated.Value
  $contentOffsetX: Animated.Value
  $contentOffsetY: Animated.Value
  didMount(): void
}

export const ImageDeepZoomView: React.FC<ImageDeepZoomViewProps> = ({
  image: {
    deepZoom: {
      Image: { Format, Size, TileSize, Url },
    },
  },
  width,
  height,
  viewPortChanges,
  $zoomScale,
  $contentOffsetX,
  $contentOffsetY,
  didMount,
}) => {
  useEffect(() => {
    // trigger first scroll event
    didMount()
  }, [])
  // setup geometry
  const levels = useMemo(() => calculateDeepZoomLevels(Size), [Size])
  const { minLevel, maxLevel } = useMemo(() => calculateMinMaxDeepZoomLevels({ width, height }, levels), [
    width,
    height,
    levels,
  ])

  const lastTilesHashCode = useRef(0)
  const [tiles, setTiles] = useState([] as JSX.Element[])

  useEvents(viewPortChanges, viewPort => {
    const zoomScale = width / viewPort.width
    const maxLevelToRender = Math.min(
      getMaxDeepZoomLevelForZoomViewScale({
        minLevel,
        minLevelWidth: levels[minLevel].width,
        zoomScale,
      }),
      maxLevel
    )
    const digest = new DJB2()

    for (let level = minLevel; level <= maxLevelToRender; level++) {
      const { minRow, minCol, maxRow, maxCol } = getVisibleRowsAndColumns({
        imageFittedWithinScreen: { width, height },
        levelDimensions: levels[level],
        tileSize: TileSize,
        viewPort: growRect(viewPort, 400 / zoomScale),
      })
      digest.include(level)
      digest.include(minRow)
      digest.include(minCol)
      digest.include(maxRow)
      digest.include(maxCol)
    }

    if (lastTilesHashCode.current === digest.hash) {
      return
    }

    lastTilesHashCode.current = digest.hash

    const result: JSX.Element[] = []
    for (let level = minLevel; level <= maxLevelToRender; level++) {
      const { minRow, minCol, maxRow, maxCol, numCols, numRows } = getVisibleRowsAndColumns({
        imageFittedWithinScreen: { width, height },
        levelDimensions: levels[level],
        tileSize: TileSize,
        viewPort: growRect(viewPort, 400 / zoomScale),
      })

      const levelTiles: JSX.Element[] = []

      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          const url = `${Url}${level}/${col}_${row}.${Format}`
          const tileTop = row * TileSize
          const tileLeft = col * TileSize
          const tileWidth = col < numCols - 1 ? TileSize : levels[level].width % TileSize
          const tileHeight = row < numRows - 1 ? TileSize : levels[level].height % TileSize

          levelTiles.push(
            <Tile key={url} url={url} top={tileTop} left={tileLeft} width={tileWidth} height={tileHeight} />
          )
        }
      }

      const levelScale = levels[level].width / width

      const $scale = Animated.divide($zoomScale, levelScale)
      const $baseImageTop = Animated.multiply($contentOffsetY, -1)
      const $baseImageHeight = Animated.multiply(height, $zoomScale)
      const $baseImageCenterY = Animated.add($baseImageTop, Animated.divide($baseImageHeight, 2))

      const $baseImageLeft = Animated.multiply($contentOffsetX, -1)
      const $baseImageWidth = Animated.multiply(width, $zoomScale)
      const $baseImageCenterX = Animated.add($baseImageLeft, Animated.divide($baseImageWidth, 2))

      const $levelPreScaleTop = Animated.subtract($baseImageCenterY, levels[level].height / 2)
      const $levelPreScaleLeft = Animated.subtract($baseImageCenterX, levels[level].width / 2)

      result.push(
        <Animated.View
          key={`level-${level}`}
          style={{
            position: "absolute",
            ...levels[level],
            transform: [
              // position centered over base image
              {
                translateX: $levelPreScaleLeft,
              },
              {
                translateY: $levelPreScaleTop,
              },
              // scale it down
              {
                scale: $scale,
              },
            ],
          }}
        >
          {levelTiles}
        </Animated.View>
      )
    }
    setTiles(result)
  })

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        ...screenBoundingBox,
        top: 0,
        left: 0,
      }}
    >
      {tiles}
    </View>
  )
}

interface Box {
  readonly width: number
  readonly height: number
}

interface Rect extends Box {
  readonly x: number
  readonly y: number
}

function growRect(rect: Rect, amount: number) {
  return {
    x: rect.x - amount,
    y: rect.y - amount,
    width: rect.width + 2 * amount,
    height: rect.height + 2 * amount,
  }
}
