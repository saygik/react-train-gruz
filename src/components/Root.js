import React, {Component} from 'react'
import Spravka1 from './spravka1'
import "./root.css"
class Root extends Component {
    render() {
        return (
            <div>

                    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <a class="navbar-brand" href="#">Navbar</a>

                        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li class="nav-item active">
                                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Отчеты
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a class="dropdown-item" href="#">Дислокация вагонов</a>
                                        <a class="dropdown-item" href="#">Погрузка-выгрузка</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <Spravka1 />
            </div>
        )
    }
}

export default Root
