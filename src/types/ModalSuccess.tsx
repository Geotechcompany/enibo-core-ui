/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseLineIcon from 'remixicon-react/CloseLineIcon';
import CheckDoubleLineIcon from 'remixicon-react/CheckDoubleLineIcon';

export interface ModalProps {
  title: string,
  __html: any,
  closeFn(): void
}

const modalSuccess = ({ closeFn, __html, title }: ModalProps) => (
  <>
    <div onClick={closeFn} className="flex items-end md:items-center justify-end pb-4">
      <CloseLineIcon size={20} className="text-gray-500 cursor-pointer" />
    </div>
    <div className="text-green-600">
      <CheckDoubleLineIcon size={60} />
    </div>

    <h2 className="text-3xl font-bold text-primary text-left mt-6 mb-2">{title}</h2>
    <div className="bg-sky-800 w-[49px] h-[3px]" />
    <div dangerouslySetInnerHTML={{ __html }} />
  </>
);

export default modalSuccess;
