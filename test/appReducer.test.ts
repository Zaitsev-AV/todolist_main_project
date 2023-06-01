import { describe, it } from 'vitest';
import {
	appReducer,
	AppStateType,
	setAppErrorAC,
	setGlobalAppStatusAC,
	setLocalAppStatusAC
} from "../src/reducer/appReducer";


describe('TaskReducer testing', () => {
	const startState: AppStateType = {
		globalAppStatus: 'idle',
		localAppStatus: 'idle',
		error: null
	};
	it( 'should be correctly change the global status of the app', () => {
		
		const endState = appReducer( startState, setGlobalAppStatusAC( { globalAppStatus:"loading" } ) );
		
		expect( endState.globalAppStatus ).toBe( 'loading' );
		expect( endState.localAppStatus ).toBe( 'idle' );
		expect( endState.error ).toBe( null );
	} );
	
	it( 'should be correctly change the global status of the app', () => {
		const endState = appReducer( startState, setLocalAppStatusAC( { localAppStatus:"loading" } ) );
		
		expect( endState.localAppStatus ).toBe( 'loading' );
		expect( endState.globalAppStatus ).toBe( 'idle' );
		expect( endState.error ).toBe( null );
	} );
	
	it( 'should be displayed correctly error', () => {
		
		const testError = "this test error"
		
		const endState = appReducer( startState, setAppErrorAC( { error:testError } ) );
		
		expect( endState.localAppStatus ).toBe( 'idle' );
		expect( endState.globalAppStatus ).toBe( 'idle' );
		expect( endState.error ).toBe( testError );
	} );
})