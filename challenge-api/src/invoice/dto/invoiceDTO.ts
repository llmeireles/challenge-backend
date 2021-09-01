import { Field, InputType, ObjectType } from "@nestjs/graphql";


@ObjectType('Invoice')
@InputType('Invoice')
export class InvoiceDTO {


    @Field({name:'Number'})
    number: number

    @Field({name:'Serie'})
    serie:string

    @Field({name:'AccessKey'})
    accessKey:string

    @Field({name:'IssueDate'})
    issueDate:Date
    
    @Field({name:'Value'})
    value:number
}