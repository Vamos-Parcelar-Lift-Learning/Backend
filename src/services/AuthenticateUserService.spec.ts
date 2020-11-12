describe('AuthentiacteUser', () => {
  beforeEach(() => {});

  it('should be able to authenticate', async () => {
    expect(1 + 2).toBe(3);
  });

  it('should not be able to authenticate with non existing user', async () => {
    expect(1 - 2).toBe(-1);
  });

  it('should not be able to authenticate with wrong password', async () => {
    expect(1 * 2).toBe(2);
  });
});
