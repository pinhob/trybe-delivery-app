import React from 'react';

render() {
   return (
    <main>
        <div>
           <ul>
               <li>PEDIDOS</li>
               <li></li>
               </ul> 
        </div>
        <div>
            <ul>
                <li>FULANA</li>
                <li>SAIR</li>
            </ul>
        </div>
    </main>
   )
}

// render() {
//     const { handleOnChange,
//       name, email, score } = this.props;
//     return (
//       <div>
//         <form action="">
//           <label htmlFor="name">
//             Name
//             <input
//               name="name"
//               type="text"
//               id="name"
//               data-testid="input-player-name"
//               onChange={ handleOnChange }
//             />
//           </label>
//           <label htmlFor="email">
//             Email
//             <input
//               name="email"
//               type="text"
//               id="email"
//               data-testid="input-gravatar-email"
//               onChange={ handleOnChange }
//             />
//           </label>
//           <Link
//             to={ {
//               pathname: '/game',
//               aboutProps: {
//                 name: { name },
//                 email: { email },
//                 score: { score },
//               },
//             } }
//           >
//             <button
//               data-testid="btn-play"
//               type="button"
//               disabled={ this.verify() }
//               onClick={ () => <Redirect to="game" /> }
//             >
//               Jogar
//             </button>
//           </Link>
//         </form>
//       </div>
//     );