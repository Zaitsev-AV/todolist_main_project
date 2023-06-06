import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import { useAppSelector } from "@/common/hooks";
import { useAppDispatch } from "@/common/hooks";
import { setAppErrorAC } from "@/app/appReducer";

export type NotificationPropsType = {

};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const Notification: React.FC<NotificationPropsType> = ( props ) => {
	const {  } = props
	
	const error = useAppSelector<string | null>(state => state.app.error)
	
	const dispatch = useAppDispatch();
	
	const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch(setAppErrorAC( { error:null }))
	};
	return (
		<Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
				{error}
			</Alert>
		</Snackbar>
	);
};