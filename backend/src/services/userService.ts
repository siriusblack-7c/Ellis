import * as userDataAccess from '../data-access/user';

export const getAllUsers = async () => {
    return userDataAccess.findAll();
};

export const updateUserStatus = async (id: string, status: string) => {
    return userDataAccess.updateById(id, { status });
}; 