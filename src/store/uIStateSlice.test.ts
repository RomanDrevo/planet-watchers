import uiStateReducer, { setIsLoading } from './uiStateSlice';

describe('uiState slice', () => {
    describe('reducer, actions and selectors', () => {
        it('should return the initial state on first run', () => {
            // Arrange
            const nextState = uiStateReducer(undefined, {
                type: undefined
            });

            // Assert
            const rootState = { uiState: { isLoading: true } };
            expect(nextState).toEqual(rootState.uiState);
        });

        it('should properly set the loading state', () => {
            // Arrange
            const initialState = { isLoading: true };

            // Act
            const action = setIsLoading(false);
            const nextState = uiStateReducer(initialState, action);

            // Assert
            const expectedState = { isLoading: false };
            expect(nextState).toEqual(expectedState);
        });

        it('should toggle the loading state', () => {
            // Arrange
            const initialState = { isLoading: false };

            // Act
            const action = setIsLoading(true);
            const nextState = uiStateReducer(initialState, action);

            // Assert
            const expectedState = { isLoading: true };
            expect(nextState).toEqual(expectedState);
        });
    });
});
