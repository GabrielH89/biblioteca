    import { sum } from "../file/file"

    describe('sum', () => {
        it('should make sum', () => {
            const result = sum(4, 5);
            expect(result).toBe(9);
        })
    })