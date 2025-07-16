import mongoose, { Schema, Document } from 'mongoose';

export interface ICareBooking extends Document {
  clientId: mongoose.Types.ObjectId;
  careRecipientId: mongoose.Types.ObjectId;
  caregiverId?: mongoose.Types.ObjectId;
  startDate: Date;
  endDate?: Date;
  scheduleDetails: any; // JSONB can be represented as a Mixed type
  hourlyRate?: number;
  totalHours?: number;
  specialInstructions?: string;
  status: string;
}

const CareBookingSchema: Schema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    careRecipientId: {
      type: Schema.Types.ObjectId,
      ref: 'CareRecipient',
      required: true,
    },
    caregiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    scheduleDetails: {
      type: Schema.Types.Mixed, // For JSONB
      required: true,
    },
    hourlyRate: {
      type: Number,
    },
    totalHours: {
      type: Number,
    },
    specialInstructions: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const CareBooking = mongoose.model<ICareBooking>('CareBooking', CareBookingSchema);

export default CareBooking; 