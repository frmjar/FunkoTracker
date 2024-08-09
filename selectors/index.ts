import { funkoSearchState } from "atoms"
import { FunkoResponseProps } from "const/interfaces"
import { fetchFunkos } from "lib/http"
import { selector } from "recoil"

export const funkoListQuery = selector({
  key: "funkoList",
  get: async ({ get }): Promise<{ data?: FunkoResponseProps, error?: string }> => {
    const search = get(funkoSearchState)

    if (!search || search.length < 3 || search === "") {
      return { error: "Search is required" }
    }

    const response = await fetchFunkos(search)
    return response
  }
})