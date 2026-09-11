import { useState } from 'react'
import styled from 'styled-components'
import { Container } from '../ui/Container'
import { OutlineButton, PrimaryAction } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { ease, fadeIn, lineUp, riseIn } from '../../styles/animations'
import { bp } from '../../styles/theme'
import { features, hero, perfil } from '../../data/content'

/*
 * Cores amostradas dos pixels do fundo de estudio da foto (grade 10x16,
 * so celulas de fundo, fora do corpo dela):
 *   #2d2518  canto superior esquerdo -- o ponto mais escuro, e quente
 *   #464334  borda esquerda, meia altura
 *   #4b483b / #514f41 / #5b5b4f  a mesma faixa andando para a direita
 *   #5b5c56  borda direita, meia altura -- a luz atras do ombro
 * A capa estende esse campo para fora da foto: clareia para a direita,
 * escurece para o texto e para o topo -- entao a borda da foto nao aparece.
 * #1f1910 e #2a2419 sao o marrom do canto um passo mais escuro, so para o
 * texto ganhar contraste.
 *
 * Trocou a foto? Reamostre -- o degrade foi calibrado nesta.
 */

/** Canto escuro da foto (#2d2518) em RGB, para o veu vertical. */
const CANTO = '45, 37, 24'

const Wrap = styled.section`
  position: relative;
  padding-bottom: 96px;

  @media (max-width: ${bp.tablet}) {
    padding-bottom: 72px;
  }
`

const Stage = styled.div`
  position: relative;
  isolation: isolate;
  padding-top: calc(${p => p.theme.layout.navHeight} + 12px);
  background:
    /* Veu vertical: topo e base puxam para o canto quente da foto. */
    linear-gradient(
      180deg,
      rgba(${CANTO}, 0.62) 0%,
      rgba(${CANTO}, 0.46) 9%,
      rgba(${CANTO}, 0) 46%,
      rgba(${CANTO}, 0) 72%,
      rgba(${CANTO}, 0.25) 100%
    ),
    /* Campo horizontal. A foto comeca perto do centro da tela e termina
       ~600px depois em qualquer largura de desktop -- por isso as paradas
       sao ancoradas no centro (calc(50% + Npx)), nao em porcentagem pura. */
      linear-gradient(
        90deg,
        #1f1910 0%,
        #2a2419 22%,
        #3a3629 calc(50% - 220px),
        #464334 50%,
        #4b483b calc(50% + 60px),
        #514f41 calc(50% + 115px),
        #5b5b4f calc(50% + 400px),
        #5b5c56 calc(50% + 560px),
        #5a5b54 100%
      );

  /* No celular o texto vem primeiro (no escuro de cima) e a foto entra
     embaixo, ocupando quase a largura toda -- a faixa horizontal atras
     dela repete as bordas esquerda e direita da propria foto. */
  @media (max-width: ${bp.tablet}) {
    padding-top: calc(${p => p.theme.layout.navHeight} + 36px);
    background:
      linear-gradient(180deg, #1f1910 0%, #2a2419 34%, rgba(42, 36, 25, 0) 64%),
      linear-gradient(90deg, #464334 0%, #4f4c3e 45%, #5b5c56 100%);
  }
`

/* Coluna da foto em `auto`: ocupa exatamente a largura da imagem e o texto
   fica com o resto, sem a foto vazar para o lado dele. */
const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 40px;
  align-items: end;

  @media (max-width: ${bp.tablet}) {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: center;
  padding-bottom: 96px;

  @media (max-width: ${bp.tablet}) {
    align-items: center;
    padding-bottom: 0;
    text-align: center;
  }
`

const Selo = styled(Badge)`
  animation: ${fadeIn} 1.2s ${ease.out} both;
`

/* Entrelinha 0.96 em vez do 0.8 do token: com tres linhas e acentos
   (ó, é), o 0.8 encosta um acento na linha de cima. */
const Title = styled.h1`
  margin: 24px 0 28px;
  font-weight: 400;
  font-size: clamp(56px, 6.4vw, ${p => p.theme.type.heroXl.size});
  line-height: 0.96;
  letter-spacing: -0.016em;

  @media (max-width: ${bp.tablet}) {
    font-size: clamp(44px, 11.5vw, ${p => p.theme.type.hero.size});
  }
`

/** Cada linha e uma mascara; o texto sobe por dentro dela. */
const Line = styled.span<{ $i: number }>`
  display: block;
  overflow: hidden;
  /* Folga para acentos e descendentes (q) nao serem cortados pela
     mascara -- compensada pela margem negativa. */
  padding: 0.08em 0 0.1em;
  margin: -0.08em 0 -0.1em;

  > span {
    display: block;
    animation: ${lineUp} 1.2s ${ease.out} both;
    animation-delay: ${p => 0.15 + p.$i * 0.08}s;
  }
`

/* Driftwood nao passa em contraste neste fundo oliva; o creme a 80%
   passa com folga e continua sendo a mesma tinta. */
const Lead = styled.p`
  max-width: 420px;
  margin-bottom: 32px;
  font-size: ${p => p.theme.type.bodyLg.size};
  line-height: 1.6;
  color: ${p => p.theme.text}cc;
  animation: ${riseIn} 1s ${ease.out} both;
  animation-delay: 0.5s;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  animation: ${riseIn} 1s ${ease.out} both;
  animation-delay: 0.6s;

  @media (max-width: ${bp.tablet}) {
    justify-content: center;
  }
`

const Meta = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 20px;
  margin-top: 28px;
  font-size: ${p => p.theme.type.body.size};
  color: ${p => p.theme.text}b3;
  animation: ${fadeIn} 1.2s ${ease.out} both;
  animation-delay: 0.8s;

  span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  @media (max-width: ${bp.tablet}) {
    justify-content: center;
  }
`

/* ------------------------------------------------------------------ */
/* Foto                                                                */
/* ------------------------------------------------------------------ */

const PhotoCol = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${bp.tablet}) {
    justify-content: center;
  }
`

/* Duas mascaras, uma por elemento (sem depender de mask-composite), para
   dissolver as bordas da foto no fundo. As paradas em 40% suavizam a rampa
   -- rampa linear curta vira faixa visivel. Esquerda curta: o braco dela
   comeca em ~12% da largura. Direita ate 84%: a calca termina em ~85%. */
const Dissolve = styled.div`
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    rgba(0, 0, 0, 0.4) 4%,
    #000 10%,
    #000 84%,
    rgba(0, 0, 0, 0.4) 93%,
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    rgba(0, 0, 0, 0.4) 4%,
    #000 10%,
    #000 84%,
    rgba(0, 0, 0, 0.4) 93%,
    transparent
  );
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
`

/* Tamanho da foto: segue a altura da tela no desktop (ela inteira cabe na
   capa) e a largura no celular. object-fit: contain + aspect-ratio da
   propria foto = proporcao intacta, sem corte e sem distorcao. Sem filtro
   de cor: o degrade foi amostrado dos pixels originais. */
const photoSize = `
  height: min(calc(100svh - 40px), 900px);
  width: auto;
  aspect-ratio: 853 / 1280;

  @media (max-width: ${bp.tablet}) {
    width: min(88vw, 360px);
    height: auto;
  }
`

/* Topo longo (so ha fundo acima da cabeca, que comeca em ~24%) e base
   longa (pernas e banco somem na emenda com a pagina). */
const Photo = styled.img`
  display: block;
  ${photoSize}
  object-fit: contain;
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 0, 0, 0.4) 7%,
    #000 16%,
    #000 80%,
    transparent
  );
  mask-image: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 0, 0, 0.4) 7%,
    #000 16%,
    #000 80%,
    transparent
  );
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  animation: ${fadeIn} 1.6s ${ease.out} both;
`

/** Se a foto nao carregar, a capa mostra o monograma no mesmo espaco. */
const Fallback = styled.div`
  display: grid;
  place-items: center;
  ${photoSize}
  font-size: 120px;
  letter-spacing: -0.02em;
  color: ${p => p.theme.borderStrong};
`

function Portrait() {
  const [failed, setFailed] = useState(false)

  if (failed) return <Fallback aria-hidden="true">{perfil.monograma}</Fallback>

  return (
    <Dissolve>
      <Photo
        src={perfil.foto}
        alt={`${perfil.nome}, ${perfil.profissao.toLowerCase()}, sorrindo, sentada em um banco de estúdio`}
        width={853}
        height={1280}
        decoding="async"
        onError={() => setFailed(true)}
      />
    </Dissolve>
  )
}

/** Emenda com o resto da pagina: o pe da capa dissolve no espresso. */
const Seam = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  height: 140px;
  pointer-events: none;
  background: linear-gradient(180deg, ${p => p.theme.bg}00, ${p => p.theme.bg});
`

/* ------------------------------------------------------------------ */
/* Diferenciais: um filete so em cima das tres colunas, nao um por item */
/* ------------------------------------------------------------------ */

const Features = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px 56px;
  margin-top: 48px;
  padding-top: 36px;
  border-top: 1px solid ${p => p.theme.border};

  @media (max-width: ${bp.tablet}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
    margin-top: 32px;
  }
`

/* Icone solto ao lado do titulo, sem circulo em volta: o circulo com
   filete em todo icone era enfeite, nao informacao. */
const Feature = styled.li`
  strong {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    font-size: ${p => p.theme.type.bodyLg.size};
    font-weight: 500;
  }

  strong svg {
    flex-shrink: 0;
    color: ${p => p.theme.textMuted};
  }

  p {
    max-width: 36ch;
    font-size: ${p => p.theme.type.body.size};
    line-height: 1.65;
    color: ${p => p.theme.textMuted};
  }
`

export function Hero() {
  return (
    <Wrap id="topo" aria-labelledby="topo-titulo">
      <Stage>
        <Container>
          <Grid>
            {/* Texto: sempre sobre o degrade, nunca sobre a foto */}
            <Copy>
              <Selo $variant="filled">{hero.selo}</Selo>

              <Title id="topo-titulo">
                {hero.titulo.map((linha, i) => (
                  <Line key={linha} $i={i}>
                    <span>{linha}</span>
                  </Line>
                ))}
              </Title>

              <Lead>{hero.lead}</Lead>

              <Actions>
                <PrimaryAction href="#contato">{hero.cta}</PrimaryAction>
                <OutlineButton as="a" href="#processo">
                  {hero.ctaSecundario}
                </OutlineButton>
              </Actions>

              <Meta>
                <span>
                  <Icon name="pin" size={16} />
                  {hero.nota}
                </span>
                <span>{perfil.creci}</span>
              </Meta>
            </Copy>

            <PhotoCol>
              <Portrait />
            </PhotoCol>
          </Grid>
        </Container>
        <Seam aria-hidden="true" />
      </Stage>

      <Container>
        <Reveal>
          <Features>
            {features.map(feature => (
              <Feature key={feature.titulo}>
                <strong>
                  <Icon name={feature.icon} size={18} />
                  {feature.titulo}
                </strong>
                <p>{feature.texto}</p>
              </Feature>
            ))}
          </Features>
        </Reveal>
      </Container>
    </Wrap>
  )
}
