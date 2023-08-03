import { create } from 'zustand';

interface AdvancedFilterModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useAdvancedFilterModal = create<AdvancedFilterModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useAdvancedFilterModal;
