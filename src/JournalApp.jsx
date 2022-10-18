import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";

export const JournalApp = () => {

    // El theme es un high order component y lo colocamos por encima del app router.
    return(
        <AppTheme>
            <AppRouter />
        </AppTheme>
    )

};