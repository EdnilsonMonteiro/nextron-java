const axios = require('axios');

export async function fetchGreeting(name) {
    try {
        const response = await axios.get(`http://localhost:8080/api/hello?name=${name}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter saudação:', error);
        throw error;
    }
}

export async function fetchSum(a, b) {
    try {
        const response = await axios.get(`http://localhost:8080/api/sum?a=${a}&b=${b}`);
        return response.data; 
    } catch (error) {
        console.error('Erro ao calcular soma:', error);
        throw error; 
    }
}
