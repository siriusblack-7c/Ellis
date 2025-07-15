import mongoose, { Schema, Document } from 'mongoose';

export interface ICareBooking extends Document {
  client_id: mongoose.Types.ObjectId;
  care_recipient_id: mongoose.Types.ObjectId;
  caregiver_id?: mongoose.Types.ObjectId;
  start_date: Date;
  end_date?: Date;
  schedule_details: any; // JSONB can be represented as a Mixed type
  hourly_rate?: number;
  total_hours?: number;
  special_instructions?: string;
  status: string;
}

const CareBookingSchema: Schema = new Schema(
  {
    client_id: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    care_recipient_id: {
      type: Schema.Types.ObjectId,
      ref: 'CareRecipient',
      required: true,
    },
    caregiver_id: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
    },
    schedule_details: {
      type: Schema.Types.Mixed, // For JSONB
      required: true,
    },
    hourly_rate: {
      type: Number,
    },
    total_hours: {
      type: Number,
    },
    special_instructions: {
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