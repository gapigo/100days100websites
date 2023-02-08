import React from 'react';

function Intro() {
  return (
    <div className="flex items-center justify-center flex-col text-center pt-20 pb-6">
      <h1 className="text-4xl md:text-7xl mb-1 md:mb-3 font-bold dark:text-white">
        Forrest
      </h1>
      <p className="text-base md:text-xl mb-3 font-medium">
        Software Engineer & Web Developer
      </p>
      <p className="text-sm max-w-xl mb-6 font-bold">This is my entire bio</p>
      <p className="text-sm max-w-xl mb-6 font-bold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, tenetur?
        Eum nulla, harum, reiciendis et nisi temporibus accusamus eligendi
        voluptate, modi suscipit dicta? <br />
        Cupiditate numquam accusamus nisi dolore ratione dicta? Sunt dolor iste
        nobis veritatis possimus autem id hic aliquam voluptate, velit quod
        natus neque repellendus nam.{' '}
        <a
          href="https://www.youtube.com/watch?v=b0pkpcD8Ms4"
          className="text-cyan-600 hover:underline underline-offset-2 decoration-2 decoration-red-600"
        >
          ForrestKnight
        </a>{' '}
        Consequatur odit illum, aut dolorum maiores, praesentium maxime optio
        tempora tenetur iste nihil.
      </p>
    </div>
  );
}

export default Intro;
