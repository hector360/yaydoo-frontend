
import api from "./api";
import axios from "axios";
import { SERVER_URL } from '../config';
const baseURL = SERVER_URL;

const APIToken = localStorage.getItem("token");

export async function login(data) {
    const response = await api.request({
        url: `/login`,
        method: "POST",
        data,
    });
    if (response.remote === "success") {
        return {
            remote: response.remote,
            data: response.data,
        };
    }
    return response;
}
export async function signUp(data) {
    const response = await api.request({
        url: `/sign-up`,
        method: "POST",
        data,
    });
    if (response.remote === "success") {
        return {
            remote: response.remote,
            data: response.data,
        };
    }
    return response;
}

export async function createProduct(token, data) {
    const response = await api.requestByToken({
        url: `/create-product`,
        method: "POST",
        token: token,
        data,
    });
    if (response.remote === "success") {
        return {
            remote: response.remote,
            data: response.data,
        };
    }
    return response;
}
export async function getInventory(token) {
    const response = await api.requestByToken({
        url: `/get-inventory`,
        method: "GET",
        token: token,
        data: {}
    });
    if (response.remote === "success") {
        return {
            remote: response.remote,
            data: response.data,
        };
    }
    return response;
}

export async function getProduct(token) {
    const response = await api.requestByToken({
        url: `/get-products`,
        method: "GET",
        token: token,
        data: {}
    });
    if (response.remote === "success") {
        return {
            remote: response.remote,
            data: response.data,
        };
    }
    return response;
}

export async function getUsers(token) {
    const response = await api.requestByToken({
        url: `/get-users`,
        method: "GET",
        token: token,
        data: {}
    });
    if (response.remote === "success") {
        return {
            remote: response.remote,
            data: response.data,
        };
    }
    return response;
}
