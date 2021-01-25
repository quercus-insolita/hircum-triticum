import * as queryString from 'query-string';

import { IFetchArgs, IFetchArgsData } from 'models/fetch';

const getFetchUrl = ({ endpoint, queryParams }: IFetchArgsData) => {
  return `${process.env.REACT_APP_FILE_SERVER_URL}${endpoint}${
    queryParams ? `?${queryString.stringify(queryParams)}` : ''
  }`;
};

const getInitHeaders = (contentType = 'application/json', hasContent = true) => {
  const headers: HeadersInit = new Headers();

  if (hasContent) {
    headers.set('Content-Type', contentType);
    headers.set('Accept', contentType);
  }

  return headers;
};

const getFetchArgs = (args: IFetchArgsData): IFetchArgs => {
  const headers = getInitHeaders();

  if (args.requestData && args.type === 'GET') {
    throw new Error('GET request does not support request body.');
  }

  return {
    method: args.type,
    headers,
    ...(args.type === 'GET' ? {} : { body: JSON.stringify(args.requestData) })
  };
};

const throwIfResponseFailed = async (res: Response) => {
  if (!res.ok) {
    let parsedException = 'Something went wrong with request!';

    try {
      parsedException = await res.json();
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }

    throw parsedException;
  }
};

export const callWebApi = async (args: IFetchArgsData): Promise<Response> => {
  const res = await fetch(getFetchUrl(args), { mode: 'no-cors', ...getFetchArgs(args) });
  await throwIfResponseFailed(res);

  return res;
};
