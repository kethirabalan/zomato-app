import { Routes } from '@angular/router';
import { LandingPageComponent } from './homepage/landing-page/landing-page.component';
import { FooterComponent } from './homepage/footer/footer.component';
import { AccordionComponent } from './homepage/accordion/accordion.component';
import { RestaurantItemsComponent } from './pages/restaurant-items/restaurant-items.component';
import { NotValidPageComponent } from './homepage/not-valid-page/not-valid-page.component';
import { MenuComponent } from './pages/menu/menu.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'restaurant',
        component: RestaurantItemsComponent
    },
    {
        path: 'footer',
        component: FooterComponent
    },
    {
        path: 'accordion',
        component: AccordionComponent
    },
    {
        path: 'menu',
        component: MenuComponent
    },
    {
        path: 'not-valid-page',
        title:'PageNotFound',
        component: NotValidPageComponent
    },
    {
        path: '**',
        component: NotValidPageComponent
    },

];
