const TodoList = artifacts.require("./TodoList.sol");

contract("TodoList", () => {
  it("should lists tasks", async () => {
    const todoList = await TodoList.deployed();
    const taskCount = await todoList.taskCount();
    const task = await todoList.tasks(taskCount);
    assert.equal(task.id.toNumber(), taskCount.toNumber());
    assert.equal(task.completed, false);
    assert.equal(taskCount.toNumber(), 0);
  });
  it("should add tasks to list", async () => {
    const todoList = await TodoList.deployed();
    await todoList.createTask("Studying Blockchain");
    const taskCount = await todoList.taskCount();
    const task = await todoList.tasks(taskCount);
    assert.equal(task.content, "Studying Blockchain");
    assert.equal(task.id.toNumber(), taskCount.toNumber());
    assert.equal(task.completed, true);
    assert.equal(taskCount.toNumber(), 1);
  });
});
