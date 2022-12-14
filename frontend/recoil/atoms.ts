import { atom } from "recoil";

interface DisclosureProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}


export const navDisclosure = atom<DisclosureProps>({
  key: 'navDisclosure',
  default: {
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
  },
});