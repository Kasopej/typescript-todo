const { task } = require('@/index');

test('uuid string', () => {
  expect(task.id).toBe('3');
});
