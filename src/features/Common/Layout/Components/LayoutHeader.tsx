import { Logo } from '@components/Logo';

const LayoutHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 flex h-20 items-center justify-between border-b-2 border-gray-100 bg-white px-8">
      <Logo className="w-11" />
    </div>
  );
};

export default LayoutHeader;
