"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const authors_module_1 = require("./modules/authors/authors.module");
const books_module_1 = require("./modules/books/books.module");
const typeorm_1 = require("@nestjs/typeorm");
const env_config_1 = require("./configs/env.config");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const dogg_module_1 = require("./dogg/dogg.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [env_config_1.default],
            }),
            authors_module_1.AuthorsModule,
            books_module_1.BooksModule,
            dogg_module_1.DoggModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'bookstore.db',
                entities: [__dirname + '/**/**/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map