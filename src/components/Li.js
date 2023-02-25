const Li = ({data}) => {
    return <> {
        Object.keys(data)[0] !== '게시판'
            ? data[Object.keys(data)[0]].event
                ? <li className="nav-item" onClick={data[Object.keys(data)[0]].event}>
                        <a className="nav-link" href='#!'>{Object.keys(data)[0]}</a>
                    </li>
                : 
                <li className="nav-item">
                        <a className="nav-link" href={data[Object.keys(data)[0]].href}>{Object.keys(data)[0]}</a>
                    </li>
            :   
            <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        href="#!"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        게시판
                    </a>
                    <ul className="dropdown-menu">
                        <li>
                            <a className="dropdown-item" href="/board">자유게시판</a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="/boardCreate">글쓰기</a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="/">즐겨찾기</a>
                        </li>
                    </ul>
                </li>
    } </>

}
export default Li;