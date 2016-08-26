// required for this component
import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { NavBarComponent } from './shared/components/navbar.component';
import { HomeComponent } from './home.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form.component';
import { PostsComponent } from './posts/posts.component';
import { AuthenticationComponent } from './auth/auth.component';
import { NotFoundComponent } from './shared/components/not-found.component';
import { ErrorComponent } from "./errors/error.component";
import { TestComponent } from './test/test.component';

@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent },
    { path: '/test', name: 'Test', component: TestComponent },
    { path: '/user', name: 'Users', component: UsersComponent},
    { path: '/user/view/:id', name: 'ViewUser', component: UserFormComponent },
    { path: '/user/edit/:id', name: 'EditUser', component: UserFormComponent,   },
    { path: '/user/add', name: 'AddUser', component: UserFormComponent },
    { path: '/user/delete/:id', name: 'DeleteUser', component: UserFormComponent },
    { path: '/post', name: 'Posts', component: PostsComponent },
    { path: '/auth/...', name: 'Auth', component: AuthenticationComponent },
    { path: '/not-found', name: 'NotFound', component: NotFoundComponent },
    { path: '/*other', name: 'Other', redirectTo: ['Home'] }
])
@Component({
    selector: 'my-app',
    template: `
        <navbar></navbar>
        <div class="container">
            <router-outlet></router-outlet>
              <my-error></my-error>
        </div>
     
    `,
    directives: [NavBarComponent, ROUTER_DIRECTIVES,ErrorComponent]
})
export class AppComponent { }


