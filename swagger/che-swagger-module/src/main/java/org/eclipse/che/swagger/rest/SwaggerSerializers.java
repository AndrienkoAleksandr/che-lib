/*
 * Copyright (c) 2012-2018 Red Hat, Inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */
package org.eclipse.che.swagger.rest;

import io.swagger.models.Swagger;
import io.swagger.util.Json;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.MessageBodyWriter;
import javax.ws.rs.ext.Provider;

@Provider
@Produces({MediaType.APPLICATION_JSON})
public class SwaggerSerializers implements MessageBodyWriter<Swagger> {

  public boolean isWriteable(
      Class type, Type genericType, Annotation[] annotations, MediaType mediaType) {
    return Swagger.class.isAssignableFrom(type);
  }

  @Override
  public long getSize(
      Swagger data, Class type, Type genericType, Annotation[] annotations, MediaType mediaType) {
    return -1;
  }

  @Override
  public void writeTo(
      Swagger data,
      Class<?> type,
      Type genericType,
      Annotation[] annotations,
      MediaType mediaType,
      MultivaluedMap<String, Object> headers,
      OutputStream out)
      throws IOException {

    out.write(Json.mapper().writeValueAsString(data).getBytes("utf-8"));
  }
}
