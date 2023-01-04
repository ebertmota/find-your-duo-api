/* eslint-disable no-console */
import { Express } from 'express';
import { resolve } from 'path';
import { readdirSync, readFileSync } from 'fs';

import expressOasGenerator, {
  SPEC_OUTPUT_FILE_BEHAVIOR,
  OpenAPIV2,
  OpenAPIV3,
} from 'express-oas-generator';
import { inProdEnvironment } from '@/main/helpers/nodeEnv';

export const setupSwagger = (app: Express): void => {
  const routesFolder = resolve(__dirname, '..', 'routes');
  const routeFileNames = readdirSync(routesFolder).filter(
    file => !file.endsWith('.map') && !file.startsWith('index'),
  );
  const tags = routeFileNames.map(file => {
    return file.charAt(0).toUpperCase() + file.slice(1).replace('.ts', '');
  });

  const openApiFolderPath = resolve(__dirname, '..', '..', '..', '..', 'docs');

  let predefinedSpec: OpenAPIV2.Document | undefined;
  try {
    predefinedSpec = JSON.parse(
      readFileSync(resolve(openApiFolderPath, 'api-docs.json'), {
        encoding: 'utf-8',
      }) as unknown as string,
    ) as OpenAPIV2.Document;
  } catch (err) {
    console.log(err);
  }

  expressOasGenerator.handleResponses(app, {
    predefinedSpec: (spec: OpenAPIV3.Document) => {
      if (predefinedSpec) {
        return predefinedSpec;
      }
      return {
        ...spec,
        info: {
          ...spec.info,
          title: 'FindYourDuo API',
          version: '1.0',
          description: `An REST API for Find your duo solution`,
          license: {
            name: ' ',
          },
        },
        externalDocs: {
          description: 'api-docs.json',
          url: '/api-spec',
        },
      };
    },
    // alwaysServeDocs: true,
    writeIntervalMs: 0,
    specOutputFileBehavior: inProdEnvironment
      ? SPEC_OUTPUT_FILE_BEHAVIOR.PRESERVE
      : SPEC_OUTPUT_FILE_BEHAVIOR.RECREATE,
    swaggerDocumentOptions: {},
    specOutputPath: resolve(openApiFolderPath, 'api-docs.json'),
    tags,
  });
};

export const serveSwaggerDocs = (): void => {
  expressOasGenerator.handleRequests();
};
