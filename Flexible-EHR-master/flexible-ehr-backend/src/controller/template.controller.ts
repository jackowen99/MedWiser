import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Template} from "../model/template.entity";

class TemplateDetail {
    id: any;
    templateName: string;
    isPublic: boolean;
    templateDetail: any;
    username: string;
}
@Controller('templates')
export class TemplateController {
    constructor(
        @InjectRepository(Template)
        private readonly templateRepository: Repository<Template>) {
    }

    @Get("all/:name")
    async getTemplate(@Param('name') name:string) {
        let list = await this.templateRepository.find();
        let res = list.filter( (l) => {
           return (l.isPublic == true || (l.isPublic == false && l.username == name))
        });
        res.sort((a,b) => (a.id - b.id));
        return res;
    }

    @Get(':name')
    async getTemplateByName(@Param('name') name:string) {
        return this.templateRepository.findOne({
            templateName: name
        })
    }

    @Post(':username')
    async saveTemplate(@Param('username') username:string, @Body() template: TemplateDetail) {
        let temp = new Template();
        temp.isPublic = template.isPublic;
        temp.templateDetail = template.templateDetail;
        temp.username = username;
        temp.templateName = template.templateName;

        return await this.templateRepository.save(temp)
    }

    @Put(':id')
    async updateTemplate(@Body() template: TemplateDetail) {
        return await this.templateRepository.save(template);
    }

    @Delete(':id')
    async deleteTemplate(@Param('id') id: number) {
        return await this.templateRepository.delete(id);
    }

}