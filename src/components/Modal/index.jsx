import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Modal = ({handleClose, isOpen, handleConfirmAction, title, body, cancelTitle, confirmTitle}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {cancelTitle && <Button onClick={handleClose} autoFocus>{cancelTitle}</Button>}
                {confirmTitle && handleConfirmAction && <Button onClick={handleConfirmAction}>{confirmTitle}</Button>}
            </DialogActions>
        </Dialog>
    );
}

export default Modal;