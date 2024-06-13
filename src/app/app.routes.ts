import { Routes } from '@angular/router';
import { LandingPageComponent } from './homepage/landing-page/landing-page.component';
import { FooterComponent } from './homepage/footer/footer.component';
import { AccordionComponent } from './homepage/accordion/accordion.component';
import { RestaurantItemsComponent } from './pages/restaurant-items/restaurant-items.component';
import { NotValidPageComponent } from './homepage/not-valid-page/not-valid-page.component';

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
    // {
    //     path: 'food-category',
    //     component: FoodCategoryComponent
    // },
    {
        path: 'not-valid-page',
        title:'Not Found',
        component: NotValidPageComponent
    },

];
