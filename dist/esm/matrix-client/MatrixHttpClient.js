var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import { keys } from '../utils/utils';
const CLIENT_API_R0 = '/_matrix/client/r0';
/**
 * Handling the HTTP connection to the matrix synapse node
 */
export class MatrixHttpClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.cancelTokenSource = axios.CancelToken.source();
    }
    /**
     * Get data from the synapse node
     *
     * @param endpoint
     * @param options
     */
    get(endpoint, params, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.send('GET', endpoint, options, params);
        });
    }
    /**
     * Post data to the synapse node
     *
     * @param endpoint
     * @param body
     * @param options
     * @param params
     */
    post(endpoint, body, options, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.send('POST', endpoint, options, params, body);
        });
    }
    /**
     * Put data to the synapse node
     *
     * @param endpoint
     * @param body
     * @param options
     * @param params
     */
    put(endpoint, body, options, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.send('PUT', endpoint, options, params, body);
        });
    }
    cancelAllRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cancelTokenSource.cancel('Manually cancelled');
        });
    }
    /**
     * Send a request to the synapse node
     *
     * @param method
     * @param endpoint
     * @param config
     * @param requestParams
     * @param data
     */
    send(method, endpoint, config, requestParams, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = config ? this.getHeaders(config) : undefined;
            const params = requestParams ? this.getParams(requestParams) : undefined;
            let response;
            try {
                response = yield axios.request({
                    method,
                    url: endpoint,
                    baseURL: this.apiUrl(CLIENT_API_R0),
                    headers,
                    data,
                    params,
                    cancelToken: this.cancelTokenSource.token
                });
            }
            catch (axiosError) {
                throw axiosError.response.data;
            }
            return response.data;
        });
    }
    /**
     * Get the headers based on the options object
     *
     * @param options
     */
    getHeaders(options) {
        const headers = {};
        const entries = [];
        if (options.accessToken) {
            entries.push(['Authorization', `Bearer ${options.accessToken}`]);
        }
        if (entries.length === 0) {
            return undefined;
        }
        for (const [key, value] of entries) {
            headers[key] = value;
        }
        return headers;
    }
    /**
     * Get parameters
     *
     * @param _params
     */
    getParams(_params) {
        if (!_params) {
            return undefined;
        }
        const params = Object.assign(_params, {});
        keys(params).forEach((key) => params[key] === undefined && delete params[key]);
        return params;
    }
    /**
     * Construct API URL
     */
    apiUrl(...parts) {
        const apiBase = this.baseUrl.endsWith('/')
            ? this.baseUrl.substr(0, this.baseUrl.length - 1)
            : this.baseUrl;
        const apiParts = parts.map((path) => (path.startsWith('/') ? path.substr(1) : path));
        return [apiBase, ...apiParts].join('/');
    }
}
//# sourceMappingURL=MatrixHttpClient.js.map