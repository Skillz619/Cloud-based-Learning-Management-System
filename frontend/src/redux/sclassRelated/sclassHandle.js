import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    getStudentsSuccess,
    detailsSuccess,
    getFailedTwo,
    getSubjectsSuccess,
    getSubDetailsSuccess,
    setAssignmentSuccess,
    setAssignmentFailure,
    setQuizSuccess,
    setQuizFailure,
    setAnnouncementSuccess,
    setAnnouncementFailure,
    getSubDetailsRequest
} from './sclassSlice';

export const getAllSclasses = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getClassStudents = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Sclass/Students/${id}`);
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(getStudentsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getClassDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(detailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getSubjectList = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSubjectsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getTeacherFreeClassSubjects = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/FreeSubjectList/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSubjectsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getSubjectDetails = (id, address) => async (dispatch) => {
    dispatch(getSubDetailsRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(getSubDetailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const setQuiz = (id, fields, address) => async (dispatch) => {
    dispatch(getRequest()); // Indicate loading state
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' }
        });
        // Handle response based on its structure
        if (response.data) {
            dispatch(setQuizSuccess(response.data));
            return Promise.resolve(response.data); // Ensuring this thunk returns a promise
        }
    } catch (error) {
        console.error("Failed to post the quiz", error);
        dispatch(setQuizFailure(error));
        dispatch(getError(error)); // Optionally maintain a general error as well
        return Promise.reject(error); // Returning a rejected promise
    }
    
};

export const setAnnouncement = (id, fields, address) => async (dispatch) => {
    dispatch(getRequest()); // Indicate loading state
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' }
        });
        // Handle response based on its structure
        if (response.data) {
            dispatch(setAnnouncementSuccess(response.data));
            return Promise.resolve(response.data); // Ensuring this thunk returns a promise
        }
    } catch (error) {
        console.error("Failed to post the announcement", error);
        dispatch(setAnnouncementFailure(error));
        dispatch(getError(error)); // Optionally maintain a general error as well
        return Promise.reject(error); // Returning a rejected promise
    }
    
};

export const setAssignment = (id, fields, address) => async (dispatch) => {
    dispatch(getRequest()); // Indicate loading state
    try {

        console.log(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`)
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' }
        });
        // Handle response based on its structure
        if (response.data) {
            dispatch(setAssignmentSuccess(response.data));
            return Promise.resolve(response.data); // Ensuring this thunk returns a promise
        }
    } catch (error) {
        console.error("Failed to post the assignment", error);
        dispatch(setAssignmentFailure(error));
        dispatch(getError(error)); // Optionally maintain a general error as well
        return Promise.reject(error); // Returning a rejected promise
    }
    
};