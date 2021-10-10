module.exports = {
    preset: 'ts-jest',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts'],
    modulePathIgnorePatterns: ['index.ts', 'build/'],
};
