export const userAdapter = (user: any) => ({
    id: user.data.id,
    name: user.data.name,
    email: user.data.email,
    role: user.role,
})