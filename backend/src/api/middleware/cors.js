import cors from "cors";

const corsOptions = {
  origin: [process.env.EXPO_LOCALHOST, process.env.EXPO_APP_IP],
  credentials: true,
  optionSuccessStatus: 200,
};

export default cors(corsOptions);
