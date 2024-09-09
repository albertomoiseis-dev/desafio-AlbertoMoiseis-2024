import { Zoologico } from './recintos-zoo';

describe('Recintos do Zoologico', () => {
    test('Deve rejeitar animal inválido', () => {
        const resultado = new Zoologico().verificarRecintosDisponiveis('DINOSSAURO', 1);
        expect(resultado.erro).toBeTruthy();
        expect(resultado.recintosDisponiveis).toBeNull();
    });

    test('Deve rejeitar quantidade inválida', () => {
        const resultado = new Zoologico().verificarRecintosDisponiveis('LEAO', -1);
        expect(resultado.erro).toBeTruthy();
        expect(resultado.recintosDisponiveis).toBeNull();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
        const resultado = new Zoologico().verificarRecintosDisponiveis('MACACO', 10);
        expect(resultado.erro).toBeTruthy();
        expect(resultado.recintosDisponiveis).toBeNull();
    });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new Zoologico().verificarRecintosDisponiveis('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosDisponiveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosDisponiveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {
        const resultado = new Zoologico().verificarRecintosDisponiveis('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosDisponiveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosDisponiveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosDisponiveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosDisponiveis.length).toBe(3);
    });
});
