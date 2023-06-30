import { describe, it } from 'vitest';
import { appReducer, AppStateType, setAppError, setGlobalAppStatus, setLocalAppStatus } from "./appReducer";



describe('TaskReducer testing', () => {
	const startState: AppStateType = {
		isInitialized: false,
		globalAppStatus: 'idle',
		localAppStatus: 'idle',
		error: null
	};
	it( 'should be correctly change the global status of the app', () => {
		
		const endState = appReducer( startState, setGlobalAppStatus( { globalAppStatus:"loading" } ) );
		
		expect( endState.globalAppStatus ).toBe( 'loading' );
		expect( endState.localAppStatus ).toBe( 'idle' );
		expect( endState.error ).toBe( null );
	} );
	
	it( 'should be correctly change the global status of the app', () => {
		const endState = appReducer( startState, setLocalAppStatus( { localAppStatus:"loading" } ) );
		
		expect( endState.localAppStatus ).toBe( 'loading' );
		expect( endState.globalAppStatus ).toBe( 'idle' );
		expect( endState.error ).toBe( null );
	} );
	
	it( 'should be displayed correctly error', () => {
		
		const testError = "this test error"
		
		const endState = appReducer( startState, setAppError( { error:testError } ) );
		
		expect( endState.localAppStatus ).toBe( 'idle' );
		expect( endState.globalAppStatus ).toBe( 'idle' );
		expect( endState.error ).toBe( testError );
	} );
})