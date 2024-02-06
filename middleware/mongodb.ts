import mongoose from 'mongoose';

interface ConnectionObject {
  isConnected?: number;
}

const connection: ConnectionObject = {};

export const connectToDb = async (): Promise<void> => {
  try {
    if (connection.isConnected) {
      return;
    }

    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("error",error);
    throw new Error(error as string);
  }
};
