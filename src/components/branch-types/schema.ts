import { z } from "zod";

// Schema for the variables of the DeleteBranchType mutation
const DeleteBranchTypeVariablesSchema = z.object({
  branchTypeName: z.string(),
});

// Schema for the response data of the DeleteBranchType mutation
const DeleteBranchTypeResponseSchema = z.object({
  deleteBranchType: z.object({
    branchTypeName: z.string(),
    description: z.string(),
    modifiedBy: z.string(),
    modifiedOn: z.string(),
  }),
});

// Schema for the variables of the UpdateBranchType mutation
const UpdateBranchTypeVariablesSchema = z.object({
  branchTypeName: z.string(),
  description: z.string(),
  modifiedBy: z.string(),
  modifiedOn: z.string(),
});

// Schema for the response data of the UpdateBranchType mutation
const UpdateBranchTypeResponseSchema = z.object({
  updateBranchType: z.object({
    branchTypeName: z.string(),
    description: z.string(),
    modifiedBy: z.string(),
    modifiedOn: z.string(),
  }),
});

// Original branch types schema
const branchTypesSchema = z.object({
  branchTypeID: z.number(),
  branchTypeName: z.string(),
  description: z.string(),
  createdBy: z.string(),
  createdAt: z.string(),
  effectiveDate: z.string(),
});

// Type alias for the branch types schema
export type BranchTypes = z.infer<typeof branchTypesSchema>;

export {
  DeleteBranchTypeVariablesSchema,
  DeleteBranchTypeResponseSchema,
  UpdateBranchTypeVariablesSchema,
  UpdateBranchTypeResponseSchema,
  branchTypesSchema,
};
