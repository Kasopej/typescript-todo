const { task } = require('@/index');

test('test uuid string', () => {
  expect(task.id).toBe('3');
});
