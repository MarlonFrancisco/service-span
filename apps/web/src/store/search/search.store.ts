import { create } from "zustand";
import { ISearchStore } from "./search.types";
import * as actions from "./search.actions";
import { loadActions } from "@/utils/helpers/store.helpers";

const useSearchStore = create<ISearchStore>((set) => {
    const isSearchPage = window.location.pathname.includes("/booking");

    return {
        searchResults: [],
        fetchingStatus: "idle",
        showFilters: false,
        showSearchBar: isSearchPage,
        hasActiveFilters: false,
        ...loadActions<ISearchStore>(Object.values(actions), set),
    }
});

export default useSearchStore;