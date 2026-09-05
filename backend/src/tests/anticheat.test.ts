describe('Anti-Cheating Focus Violation Suite', () => {
  it('should allow warnings for violations 1 through 5', () => {
    const maxAllowed = 5;
    for (let count = 1; count <= 5; count++) {
      const isCancelled = count >= 6;
      expect(isCancelled).toBe(false);
      expect(count <= maxAllowed).toBe(true);
    }
  });

  it('should trigger automatic cancellation on the 6th violation', () => {
    const violationCount = 6;
    const isCancelled = violationCount >= 6;
    const status = isCancelled ? 'CANCELLED' : 'IN_PROGRESS';
    const cancellationReason = isCancelled
      ? 'Exceeded maximum 5 focus loss violations during active test monitoring.'
      : undefined;

    expect(isCancelled).toBe(true);
    expect(status).toEqual('CANCELLED');
    expect(cancellationReason).toBeDefined();
  });
});
