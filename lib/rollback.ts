const handleRollback = async (rollbackHandlers: AnyFunction[]) => {
  for (const callback of rollbackHandlers.reverse()) {
    await callback()
  }
}
export const getRollbackHanlder = () => {
  const rollbackHandlers: AnyFunction[] = []
  return {
    rollbackHandlers,
    handleRollback: handleRollback.bind(null, rollbackHandlers),
  }
}
