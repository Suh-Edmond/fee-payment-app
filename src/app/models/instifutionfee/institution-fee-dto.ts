export class InstitutionFeeDto {
  created: string | undefined;
  updated: string | undefined;
  id: string | undefined;
  name: string | undefined;
  amountPayable: number | undefined;
  category: InstitutionFeeCategory | undefined;
}

export enum InstitutionFeeCategory {
  FRESH_MEN,
  SOPHOMORE,
  SENIOR,
}
