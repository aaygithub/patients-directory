import { rest } from "msw";
import mock_data from "./mock_data.json";
export const handlers = [
  // Handles a GET /patients request
  rest.get("/patients", (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.json(mock_data),
      ctx.status(200)
    );
  }),
];
