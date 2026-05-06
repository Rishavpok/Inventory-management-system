import { create } from 'zustand';

interface BranchStore {
  branches: string[];
  addBranch: (branch: string) => void;
  removeBranch: (branch: string) => void;
}

export const useBranchStore = create<BranchStore>((set) => ({
  branches: ['Main Branch', 'Downtown', 'Warehouse'],
  addBranch: (branch) => set((state) => {
    if (state.branches.includes(branch)) return state;
    return { branches: [...state.branches, branch] };
  }),
  removeBranch: (branch) => set((state) => ({
    branches: state.branches.filter((b) => b !== branch)
  }))
}));
