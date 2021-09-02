import { Field, InputType, ObjectType } from "@nestjs/graphql";


@InputType('Invoice')
export class InvoiceDTO {


    @Field({name:'Number'})
    number: string

    @Field({name:'Serie'})
    serie:string

    @Field({name:'AccessKey'})
    accessKey:string

    @Field({name:'IssueDate'})
    issueDate:Date
    
    @Field({name:'Value'})
    value:string
}