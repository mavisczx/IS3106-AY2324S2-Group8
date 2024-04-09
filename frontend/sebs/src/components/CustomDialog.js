import { Dialog } from "@headlessui/react"

function CustomDialog({title, children, className = "", open, onClose}) {
    
    return <Dialog open={open} onClose={onClose}
        className={`relative z-50 ${className}`}>
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white ">
            <Dialog.Title className="bg-black text-white px-4 py-2 rounded-t">{title}</Dialog.Title>
            {children}
          </Dialog.Panel>
          </div>
        </Dialog>


}

export default CustomDialog;