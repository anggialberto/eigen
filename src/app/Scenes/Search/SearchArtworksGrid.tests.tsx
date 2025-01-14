import { fireEvent, screen } from "@testing-library/react-native"
import { ArtworkFiltersStoreProvider } from "app/Components/ArtworkFilter/ArtworkFilterStore"
import { FancyModal } from "app/Components/FancyModal/FancyModal"
import { mockTrackEvent } from "app/tests/globallyMockedStuff"
import { setupTestWrapperTL } from "app/tests/setupTestWrapper"
import { graphql } from "react-relay"
import { SearchArtworksGridPaginationContainer } from "./SearchArtworksGrid"

jest.unmock("react-relay")

describe("SearchArtworksGrid", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props) => (
      <ArtworkFiltersStoreProvider>
        <SearchArtworksGridPaginationContainer viewer={props.viewer} keyword="Art" />
      </ArtworkFiltersStoreProvider>
    ),
    query: graphql`
      query SearchArtworksGridTestsQuery($input: FilterArtworksInput, $count: Int, $keyword: String)
      @relay_test_operation {
        viewer {
          ...SearchArtworksGrid_viewer @arguments(input: $input, keyword: $keyword, count: $count)
        }
      }
    `,
    variables: {
      count: 20,
      keyword: "Art",
    },
  })

  it("tracks filter modal opening", () => {
    renderWithRelay()

    fireEvent.press(screen.getByText("Sort & Filter"))
    expect(mockTrackEvent.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          Object {
            "action_name": "filter",
            "action_type": "tap",
            "context_screen": "Search",
            "context_screen_owner_id": null,
            "context_screen_owner_slug": null,
            "context_screen_owner_type": "Search",
          },
        ]
      `)
  })

  it("tracks filter modal closing", () => {
    renderWithRelay()

    screen.UNSAFE_getByType(FancyModal).props.onBackgroundPressed()

    expect(mockTrackEvent.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          Object {
            "action_name": "closeFilterWindow",
            "action_type": "tap",
            "context_screen": "Search",
            "context_screen_owner_id": null,
            "context_screen_owner_slug": null,
            "context_screen_owner_type": "Search",
          },
        ]
      `)
  })

  it('should display "Sort & Filter" label by default', () => {
    renderWithRelay()

    expect(screen.queryByText("Sort & Filter")).toBeTruthy()
  })
})
